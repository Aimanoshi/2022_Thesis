// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { useEffect, useState } from 'react';
import merge from 'lodash/merge';
import schemaDefaults from 'json-schema-defaults';

import { BaseEditor, BaseEditorProps, OnInit } from './BaseEditor';

interface JsonEditorProps extends Omit<BaseEditorProps, 'language' | 'value' | 'errorMessage' | 'onChange'> {
  onChange: (jsonData: any) => void;
  value?: object;
  schema?: any;
  onError?: (error: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = (props) => {
  const {
    options: additionalOptions,
    value: initialValue,
    onChange,
    onInit: onInitProp,
    onError,
    schema,
    id,
    styleOverrides = [],
    ...rest
  } = props;

  const [parseError, setParseError] = useState<string>('');
  const options = {
    quickSuggestions: true,
    folding: false,
    readOnly: false,
    ...additionalOptions,
  };

  useEffect(() => {
    onError?.(parseError);
  }, [parseError]);

  const onInit: OnInit = (monaco) => {
    const disposable = monaco.editor.onDidCreateModel((model) => {
      try {
        const diagnosticOptions: any = {
          validate: true,
          enableSchemaRequest: true,
        };

        if (schema) {
          const uri =
            typeof schema === 'object'
              ? URL.createObjectURL(new Blob([JSON.stringify(schema)], { type: 'application/json' }))
              : schema;
          const otherSchemas = monaco.languages.json.jsonDefaults.diagnosticsOptions.schemas || [];
          const currentSchema = otherSchemas.find((s) => s.uri === uri);

          /**
           * Because we mutate the global language settings, we need to
           * add new schemas / new models to existing schemas.
           * This lets us have multiple editors active using different schemas
           * by taking advantage of the `fileMatch` property + the model's uri.
           */
          diagnosticOptions.schemas = [
            ...otherSchemas.filter((s) => s.uri !== uri),
            {
              uri,
              schema: typeof schema === 'object' ? schema : undefined,
              fileMatch: [...(currentSchema?.fileMatch || []), model.uri.toString()],
            },
          ];
        }

        monaco.languages.json.jsonDefaults.setDiagnosticsOptions(diagnosticOptions);
      } catch (_err) {
        // don't worry if we aren't able to set the schema
      }

      if (disposable) {
        // only do this once per model being created
        disposable.dispose();
      }
    });

    if (typeof onInitProp === 'function') {
      onInitProp(monaco);
    }
  };

  const handleChange = (value) => {
    if (value) {
      if (value === '=') {
        onChange(value);
      } else {
        try {
          const data = JSON.parse(value);
          onChange(data);
          setParseError('');
        } catch (err) {
          setParseError('Invalid json');
        }
      }
    } else {
      onChange(undefined);
      setParseError('');
    }
  };

  const json = schema?.type === 'object' ? merge({}, schemaDefaults(schema), initialValue) : initialValue;

  return (
    <BaseEditor
      key={id}
      errorMessage={parseError}
      helpURL="https://www.json.org"
      id={id}
      language="json"
      options={options}
      styleOverrides={styleOverrides}
      value={JSON.stringify(json, null, 2)}
      onChange={handleChange}
      onInit={onInit}
      {...rest}
    />
  );
};

export { JsonEditor };

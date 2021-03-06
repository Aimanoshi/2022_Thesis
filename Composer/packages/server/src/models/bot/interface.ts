// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseSchema, ILuisConfig, IQnAConfig, IOrchestratorConfig } from '@bfc/shared';

export type Resource = { id: string; isEmpty: boolean };

export interface LocationRef {
  storageId: string;
  path: string;
}

export interface IBuildConfig {
  luisConfig: ILuisConfig;
  qnaConfig: IQnAConfig;
  orchestratorConfig?: IOrchestratorConfig;
  luResource: Resource[];
  qnaResource: Resource[];
}

export interface ILuisSettings {
  luis: {
    [key: string]: string;
    endpoint: string;
    endpointKey: string;
  };
}

// we will probably also use this interface to consolidate the processing of lu\lg\dialog
export enum FileUpdateType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface IOperationLUFile {
  diagnostics?: any[]; // ludown parser output
  relativePath?: string;
  content?: string;
  intents: [];
}

export interface ILuisStatusOperation {
  [key: string]: IOperationLUFile;
}

export interface IOrchestratorProgress {
  (status: string): void;
}

export interface IOrchestratorBuildOutput {
  outputs: [{ id: string; snapshot: Uint8Array; recognizer: Record<string, BaseSchema> }];
  settings: {
    orchestrator: {
      modelPath: string;
      snapshots: Map<string, string>;
    };
  };
}

export interface IOrchestratorSettings {
  orchestrator: {
    models: {
      en?: string;
      multilang?: string;
    };
    snapshots: Record<string, string>;
  };
}

export type CrossTrainingSetting = {
  inter: boolean; //Only performs the inner dialog cross train
  intra: boolean; //Only performs the intra dialog cross train
};

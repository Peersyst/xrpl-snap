import type { Component } from '@metamask/snaps-sdk';

export declare class ExtractFamilySeedDialog {
  static buildHeader(): Component[];

  static buildBody(privateKey: string): Component[];

  static prompt(privateKey: string): Promise<void>;
}

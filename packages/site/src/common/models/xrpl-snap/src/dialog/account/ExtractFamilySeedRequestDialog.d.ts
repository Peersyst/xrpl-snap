import type { Component } from '@metamask/snaps-sdk';

export declare class ExtractFamilySeedRequestDialog {
  static buildHeader(): Component[];

  static buildBody(): Component[];

  static prompt(): Promise<boolean>;
}

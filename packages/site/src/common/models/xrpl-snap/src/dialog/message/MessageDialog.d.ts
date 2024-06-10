import type { Component } from '@metamask/snaps-sdk';

export declare class MessageDialog {
  static buildHeader(origin: string): Component[];

  static buildFooter(): Component[];

  static buildBody(message: string): Component[];

  static prompt(origin: string, message: string): Promise<boolean>;
}

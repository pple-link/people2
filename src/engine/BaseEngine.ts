import { chromium, Page } from "playwright";

export interface ILogin {
  id: string;
  pw: string;
}

export abstract class BaseEngine {
  private browser: any;
  public async launch(url: string): Promise<Page> {
    this.browser = await chromium.launch();
    const context = await this.browser.newContext();
    const page = await context.newPage(url);
    return page;
  }

  public async close(): Promise<void> {
    await this.browser.close();
  }
}

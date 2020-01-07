import { InterceptorInterface, Action } from "routing-controllers";

export class ExampleInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return content.replace(/Mike/gi, "Michael");
  }
}

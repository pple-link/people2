import { InterceptorInterface, Action } from "routing-controllers";

export class ResponseJosnInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    content.result = true;
    return content;
  }
}

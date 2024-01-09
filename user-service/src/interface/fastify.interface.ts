import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
  RouteHandlerMethod,
  RouteShorthandOptions,
} from "fastify";

import { API_METHODS } from "./api.interface";

export interface IRouteOptions<T extends RouteGenericInterface>
  extends RouteShorthandOptions {
  url: string;
  method: API_METHODS;
  handler: RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    T
  >;
}
export interface RequestContext {
  set(key: string, value: any): void;
  get(key: string): any;
}

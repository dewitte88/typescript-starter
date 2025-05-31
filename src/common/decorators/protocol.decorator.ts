import { createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";

export const Protocol = createParamDecorator((defautValue: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.protocol;
});
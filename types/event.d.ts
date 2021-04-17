declare type EventName = keyof WindowEventMap;
declare interface ClsEventMap {
  [key: EventName | string]: Function[];
}
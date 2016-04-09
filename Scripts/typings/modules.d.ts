///<reference path="tsd.d.ts"/>



declare module "Scripts/libs/jquery" {
    var $: JQueryStatic;
    export = $;
}

declare module "Scripts/libs/dat.gui" {
    export = dat;
}

declare module "Scripts/libs/domReady" {
    export = domready;
}
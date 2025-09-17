import * as app1 from "./app1";
import * as app2 from "./app2";
import * as app3 from "./app3";

export function runAllApps(app: any) {
    app1.runapp(app);
    app2.runapp(app);
    app3.runapp(app);
}
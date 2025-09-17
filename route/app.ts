import * as app1 from "./app1";
import * as app2 from "./app2";
import * as app3 from "./app3";

export async function runAllApps(app: any) {
    await app1.runapp(app);
    await app2.runapp(app);
    await app3.runapp(app);
}
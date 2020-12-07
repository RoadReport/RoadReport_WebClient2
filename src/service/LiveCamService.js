import {fetchDynamicLiveCamSource} from "@/service/FirebaseRemoteConfigService";

export function getDynamicLiveCamSourceJson() {
  let data = fetchDynamicLiveCamSource();
  return JSON.parse(data._value);
}
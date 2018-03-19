/* @flow */

import {Alert, AlertIOS, ToastAndroid} from 'react-native';
import {isAndroid, isIOS} from "../utils/react-native-util";

function getAndroidErrorToast(error) {
  ToastAndroid.show(error, ToastAndroid.SHORT);
}

function getAndroidErrorAlert(errorTitle, error, btnText? : string, onPress? : () => void, notAllowCancel? : boolean) {
  if(btnText && onPress && notAllowCancel) {
    Alert.alert(
      errorTitle,
      error,
      [{text: btnText, onPress: onPress}],
      {cancelable: !notAllowCancel}
    )
  } else {
    Alert.alert(
      errorTitle,
      error,
      [{text: 'OK', onPress: () => {}}]
    )
  }
}

function getIOSErrorAlert(errorTitle : string, error : string, btnText? : string, onPress? : () => void, notAllowCancel? : boolean) {
  if(btnText && onPress && notAllowCancel) {
    Alert.alert(
      errorTitle,
      error,
      [{text: btnText, onPress: onPress}],
      {cancelable: !notAllowCancel}
    );
  } else {
    AlertIOS.alert(
      errorTitle,
      error,
    );
  }
}

function getCrossDialogAlert(errorTitle, error, onCancel, onOk, cancelText, okText) {
  Alert.alert(
    errorTitle,
    error,
    [{text: cancelText || 'Annuller', onPress: onCancel}, {text: okText ||'OK', onPress: onOk}]
  )
}

export function showError(isToast : boolean, errorTitle : string, error : string, btnText? : string, onPress? : () => void, notAllowCancel? : boolean) : void {
  if(error) {
    if(isIOS()) {
      getIOSErrorAlert(errorTitle, error, btnText, onPress, notAllowCancel);
    } else if(isAndroid() && isToast) {
      getAndroidErrorToast(error)
    } else {
      getAndroidErrorAlert(errorTitle, error, btnText, onPress, notAllowCancel)
    }
  }
}

export function showErrorDialog(errorTitle : string, error : string, onCancel : () => void, onOk : () => void, cancelText : ?string, okText : ?string) : void {
  if(error) {
    getCrossDialogAlert(errorTitle, error, onCancel, onOk, cancelText, okText);
  }
}

export function showVersionError(openStore : () => void) {
  const btnText = isIOS() ? "Send mig til app store" : "Send mig til play store";
  const recursivelyKeepDialogOpen = () => showError(false, "Din app skal opdateres", "Følg linket nedenfor for at få den seneste version af Task.", btnText, () => {recursivelyKeepDialogOpen(); openStore();}, true);
  recursivelyKeepDialogOpen();
}

export function getResponseErrors(responseBody: Object) {
  let keys = Object.keys(responseBody);
  if(typeof responseBody === "string") {
    console.log("error: ", responseBody);
    showError(true, "Error", responseBody);
  } else {
    keys.map(key => {
      console.log("error: ", responseBody[key][0]);
      showError(true, "Error", responseBody[key][0]);
    });
  }
}
import AsyncStorage from '@react-native-async-storage/async-storage';

export const taroldQrCodot = async value => {
  try {
    const jsonkey = value.key;
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(jsonkey, jsonValue);
  } catch (e) {
    //alert(`Tárolas közben hiba lépett fel: ${e}`);
    throw new Error(`Tárolas közben hiba lépett fel: ${e}`);
  }
};

export const olvasdQrCodot = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(`Olvasás közben hiba lépett fel: ${e}`);
  }
};

export const torolQrCodot = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(`Törlés közben hiba lépett fel: ${e}`);
  }
};

export const olvasdAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    throw new Error(`Kulcsok beolvasása közben hiba lépett fel: ${e}`);
  }
};

export const keresKeyInKeys = async key => {
  try {
    let tomb = await AsyncStorage.getAllKeys();
    //tomb.map((x) => console.log("Tárolt kulcsok:", x))
    //undefined ha nincs találat
    return tomb.find(x => {
      if (x === key) {
        return true;
      }
    });
  } catch (e) {
    throw new Error(`Kulcsok beolvasása közben hiba lépett fel: ${e}`);
  }
};

export const olvasdAllKeysCount = async () => {
  try {
    //console.log(`mennyi result kezd`)
    let tomb = await AsyncStorage.getAllKeys();
    //console.log(`mennyi result: ${tomb.length}`)
    return tomb.length;
  } catch (e) {
    throw new Error(`Kulcsok beolvasása közben hiba lépett fel: ${e}`);
  }
};

export const torolAllQrCodot = async () => {
  try {
    let tomb = await AsyncStorage.getAllKeys();
    AsyncStorage.multiRemove(tomb);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(`Kulcsok törlése közben hiba lépett fel: ${e}`);
  }
};

export const olvasdAllQrCodot = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys === undefined) {
      return undefined;
    }
    if (Array.isArray(keys)) {
      return await AsyncStorage.multiGet(keys).then(values => {
        let e = [];
        values.forEach(x => {
          e.push(JSON.parse(x[1]));
        });
        return e;
      });
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

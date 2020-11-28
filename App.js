/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Button, Fab, Root, Textarea, Toast, View } from 'native-base';
import React, { useState } from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageCropPicker from 'react-native-image-crop-picker';
import TesseractOcr, { LANG_TURKISH, useEventListener } from 'react-native-tesseract-ocr';
import Clipboard from '@react-native-community/clipboard';


const tessOptions = {};



const getPermissions = async () => {
  const permissions = await PermissionsAndroid.requestMultiple([
    "android.permission.WRITE_EXTERNAL_STORAGE",
    "android.permission.READ_EXTERNAL_STORAGE"
  ])

  const a = Object.values(permissions).filter(d => d === "granted");
  if (a.length === 2) return true
  else {
    Toast.show({
      text: "Eğer geçerli izinleri vermezseniz, uygulama doğru çalışamayacaktır",
      buttonText: "Tamam",
      duration: 3000
    });
    return false;
  }
}

const App = () => {
  const [fabActive, setFabActive] = useState(false);
  const [img, setImg] = useState();
  const [text, setText] = useState()
  const [progress, setProgress] = useState(0);
  useEventListener('onProgressChange', (p) => {
    setProgress(p.percent / 100);
  });
  
  const recognazeText = async (path) => {
    await TesseractOcr.recognize(path, LANG_TURKISH, tessOptions).then(recognazedText => {
      Clipboard.setString(recognazedText.replace(/\n/g," ").replace(/-/g,"")));
      Toast.show({
        text: "Metin panoya kopyalandı",
        buttonText: "Ok",
        type: "success",
        duration: 3000
      })
      setText(recognazedText.replace(/\n/g," ").replace(/-/g,""))
      setProgress(0)
    });

  }

  const imageFromCamera = async () => {
    try {
      if (getPermissions()) {
        await ImageCropPicker.openCamera({
          cropping: true,
          freeStyleCropEnabled: true,
        }).then(image => {
          recognazeText(image.path)
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const imageFromGallery = async () => {
    try {
      if (getPermissions()) {
        await ImageCropPicker.openPicker({
          cropping: true,
          freeStyleCropEnabled: true,
        }).then(image => {
          recognazeText(image.path)
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <Root>
      <View style={styles.textWrapper}>
        {
          progress ?
            <Progress.Circle
              size={50}
              indeterminate={false}
              showsText={true}
              allowFontScaling={true}
              progress={progress}
            /> :
            <Textarea
              rowSpan={20}
              bordered
              placeholder="Bir yazının fotoğrafını çekin ve çıktıyı burada görün."
              value={text}
              style={styles.textarea}
            />
        }
      </View>
      <View>
        <Fab
          active={fabActive}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: 'orange' }}
          position="bottomRight"
          onPress={() => setFabActive(!fabActive)}>
          <Icon name="plus" />
          <Button style={{ backgroundColor: 'lightblue' }} onPress={imageFromCamera}>
            <Icon name="camera" />
          </Button>
          <Button style={{ backgroundColor: 'lightblue' }} onPress={imageFromGallery}>
            <Icon name="image" />
          </Button>
        </Fab>
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    marginTop: 20
  },
  textarea: {
    width: "100%"
  }
});

export default App;

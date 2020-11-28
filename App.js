/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Button, Fab, Text, Textarea, View } from 'native-base';
import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {Surface, Shape} from '@react-native-community/art';
import Icon from 'react-native-vector-icons/FontAwesome';


const App = () => {
  const [loading, setLoading] = useState(false);
  const [fabActive, setFabActive] = useState(false);
  return (
    <>
      <View style={styles.textWrapper}>
        {
          loading ? 
            <Progress.Circle
              size={50}
              indeterminate={false}
              showsText={true}
              allowFontScaling={true}
              progress={0.20}
            /> :  
          <Textarea 
            rowSpan={10} 
            bordered 
            placeholder="Textarea" 
            value="Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur." />
        }
      </View> 
      <View>
      <Fab
            active={fabActive}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: 'orange' }}
            position="bottomRight"
            onPress={() => setFabActive(!fabActive)}>
            <Icon name="plus" />
            <Button style={{ backgroundColor: 'lightblue' }}>
              <Icon name="camera" />
            </Button>
            <Button style={{ backgroundColor: 'lightblue' }}>
              <Icon name="image" />
            </Button>
          </Fab>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    marginTop:20
  },
});

export default App;

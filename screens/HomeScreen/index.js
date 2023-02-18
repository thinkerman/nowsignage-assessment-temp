import {useState, useEffect, useCallback, useRef} from 'react';
import {Text, View, Image, StatusBar, ActivityIndicator} from 'react-native';
import {download_file, get_url_extension} from '../../utilities/helpers';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {
  StoreCacheLocalUrls,
  getCacheLocalUrlLists,
} from '../../utilities/storage';
import http from '../../utilities/http';
import {Video} from 'expo-av';
import styles from './style';

const HomeScreen = () => {
  const video = useRef(null);
  const [displayItem, setDisplayItem] = useState([]); // this stores the entire list
  const [activeKey, setActiveKey] = useState(0); // this tells the current display list
  const [search, setSearch] = useState(false); // this is used for first time when downloading files
  const [error, setError] = useState(false); // this when an error occur while downloading data

  const SaveToLocal = async (data) => {
    // function to help us save the file and return the path as fileUrl
    let ext = await get_url_extension(data?.url);
    const {uri} = await download_file(data?.url, ext)?.downloadAsync();
    return {fileURL: uri};
  };

  const getDataFromEndpoint = useCallback(async () => {
    // function that does retrieve the data from the http service
    try {
      setSearch(true);
      // retrieve data from http;
      const resp = await http.get();
      let sanitizeResponse = resp?.data?.record?.items;

      //this does download files and generate a new path for them.
      const newData = await Promise.all(
        sanitizeResponse.map(async (item) => {
          let result = await SaveToLocal(item);
          item.fileURL = result.fileURL;
          return item;
        }),
      );
      // save the new generated array to mount the component
      setDisplayItem(newData);
      setSearch(false);
      // store the generated data for offline use
      StoreCacheLocalUrls(newData);
    } catch (error) {
      setError(true);
      setSearch(false);
    }
  }, []);

  const GetLocalStorageFiles = async () => {
    // This fucnction checks if data already exist in storage
    const localData = await getCacheLocalUrlLists();
    if (localData) {
      setDisplayItem(localData);
    } else {
      // otherwise it download fresh one
      getDataFromEndpoint();
    }
  };

  const nextItem = () => {
    //this function decides the sequential listing of data
    if (activeKey === displayItem.length - 1) {
      setActiveKey(0);
    } else {
      setActiveKey(activeKey + 1);
    }
  };
  const onVideoEnd = (status) => {
    // this function helps for videos to decide the next item on screen
    if (status) {
      nextItem();
    }
  };

  useEffect(() => {
    if (displayItem.length < 1) {
      //no point on sending http request if data already exist
      GetLocalStorageFiles();
    }
    if (displayItem[activeKey]?.type === 'image') {
      // this handles the clock ticking of the next item and clearing it after
      const intervalId = setTimeout(() => {
        nextItem();
      }, 5000);
      return () => clearTimeout(intervalId);
    }
  }, [displayItem, activeKey]);
  return (
    <View style={styles.container}>
      <StatusBar hidden testID='status-bar' />
      {search && (
        //we should show indicators for user experience while loading data
        <View style={styles.loaderMessage}>
          <ActivityIndicator
            animating={true}
            color='#0089AF'
            size='small'
            testID='indicator-id'
            style={styles.activityIndicator}
          />
          <Text testID='loading-text' style={styles.welcomeText}>
            Loading Contents....
          </Text>
        </View>
      )}
      {error && (
        // we should also show indicator if an error occur
        <View style={styles.loaderMessage}>
          <Text testID='errorText' style={styles.welcomeText}>
            Something went wrong please try again
          </Text>
        </View>
      )}
      {displayItem[activeKey]?.type === 'image' && (
        //this displays either image or video as per the file type
        <>
          <View style={styles.circleTimer}>
            <CountdownCircleTimer
              isPlaying
              key={activeKey + 1}
              duration={5}
              testID='countTimer'
              size={50}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
            >
              {/* {({remainingTime}) => <Text>{remainingTime}</Text>} */}
            </CountdownCircleTimer>
          </View>

          <Image
            testID='image-id'
            style={styles.imageSize}
            source={{
              uri: displayItem[activeKey]?.fileURL,
            }}
          />
        </>
      )}
      {displayItem[activeKey]?.type === 'video' && (
        <Video
          testID='video-id'
          style={styles.imageSize}
          ref={video}
          source={{
            uri: displayItem[activeKey]?.fileURL,
          }}
          resizeMode='cover'
          shouldPlay
          onPlaybackStatusUpdate={(status) => onVideoEnd(status.didJustFinish)}
        />
      )}
    </View>
  );
};
export default HomeScreen;

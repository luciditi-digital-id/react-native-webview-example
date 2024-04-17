/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  FlatList,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';

function App(): React.JSX.Element {
  const [messages, setMessages] = useState<
    {key: number; data: string; info: string}[]
  >([{key: performance.now(), data: 'demoStarted', info: 'demo started'}]);

  // The Luciditi SDK reports progress and errors via the onMessage event
  const onMessage = (event: WebViewMessageEvent) => {
    const {data} = event.nativeEvent;
    console.log('onMessage', data);

    // This explains the different messages that can be received from the Luciditi SDK
    // For example, in an age assurance process you may wish to check the process was
    // successfully completed (luciditiVerificationAgeEstimationComplete) and automatically close the
    // WebView when the user has completed the verification process (lucidtiVerificationComplete)
    const getMessageInfo = () => {
      switch (data) {
        case 'luciditiVerificationStarted': // This indicates that the verification process has started
          return 'verification process has started';
        case 'luciditiVerificationComplete': // This indicates that the user has completed the verification process
          return 'user has completed verification';
        case 'luciditiVerificationError': // This indicates that the user has encountered an error during the verification process
          return 'user has encountered an error during verification';
        case 'luciditiVerificationAborted': // This indicates that the user has cancelled the verification process
          return 'verification aborted due to user cancelling or session timeout';
        case 'luciditiVerificationTakingSelfie': // This indicates that the user has been asked to take a selfie
          return 'user has been asked to take a selfie';
        case 'luciditiVerificationRetakingSelfie': // This indicates that the user has been asked to re-try taking a selfie
          return 'user has been asked to re-try taking a selfie';
        case 'luciditiVerificationTakingPassportPhoto': // This indicates that the user has been asked to take a passport photo
          return 'user has been asked to take a passport photo';
        case 'luciditiVerificationRetakingPassportPhoto': // This indicates that the user has been asked to re-try taking a passport photo
          return 'user has been asked to re-try taking a passport photo';
        case 'luciditiVerificationTakingIdDocumentPhoto': // This indicates that the user has been asked to take an id document photo
          return 'user has been asked to take an id document photo';
        case 'luciditiVerificationRetakingIdDocumentPhoto': // This indicates that the user has been asked to re-try taking an id document photo
          return 'user has been asked to re-try taking an id document photo';
        case 'luciditiVerificationValidating': // This indicates that the Luciditi SDK is validating the user supplied data
          return 'luciditi sdk is validating user suppplied data';
        case 'luciditiVerificationUploading': // This indicates that the Luciditi SDK is uploading the user supplied data
          return 'luciditi sdk is uploading validated user supplied data';
        case 'luciditiVerificationVerifySelfie': // This indicates that the Luciditi SDK is verifying the user supplied selfie
          return 'luciditi sdk is verifying user supplied selfie';
        case 'luciditiVerificationVerifyPassport': // This indicates that the Luciditi SDK is verifying the user supplied passport
          return 'luciditi sdk is verifying user supplied passport';
        case 'luciditiVerificationAgeEstimationSuccessful': // This indicates that the user has successfully completed the age estimation process
          return 'user has successfully completed an age estimation process';
        case 'luciditiVerificationFailed': // This indicates that the verification process failed to start due to an error
          return 'luciditi sdk failed to start due to an error';
        case 'luciditiVerificationWaitingForInvite': // This indicates that the verification process is waiting for the user to respond to an invitation in the Luciditi app
          return 'luciditi sdk is waiting for a user to respond to an invitation requesting the required verification data';
        default:
          return data;
      }
    };

    const info = getMessageInfo();

    const newMessage = {key: performance.now(), data: data, info: info};

    setMessages([...messages, newMessage]);
  };

  // Step 1 - Ensure that you are using the correct Luciditi SDK URI for your environment
  const sdkApiUri = 'https://sdk-uat3.luciditi-api.net';

  // Step 2 - Replace this with your own startup token
  const startupToken =
    'eyJzdCI6ImlPemxzTHNNaE4wZ1VtdEY1UlNnWm44OGc0dUJQanBDOHA2b05YQ1dBWHFOcHIydDJZeG13Y1FKZzBQdS9DSi9MVGxkTzNxZXdCZGFqM1NlZXZBMy9yWVhQUkVET1x1MDAyQnVIVk56cXNjUGlGbEZtdHIzR1NhUWV1U3hHbzQ1eHlQQWovMmtKYWh5T1QvUTdMRndMckJOQVRFUzVFYXNiMUpPSWNPbnJ5c2tWb0RjN21hMjZkemY5M1BcdTAwMkJURHNHbmVLeVFsODRJQXRIZTZlMDBXcFYzZk90UlRVM1dOT1d5QnpuT1RENXpVS3M2Q1x1MDAyQlNlWVV6WFJBTkpzZ2dKRS83UXRtVHNyazR1elpjRHVtc0pRRTc5WlBUVjhpbnlxVnN2SGROZ3NKOTBkRk5cdTAwMkJzRmt0dVFFcUtRVDJvRGZ5Snl2aEowSWIiLCJlayI6InpHR0pDUktaQnRJV3V4dDVTWVNTV0VjSVx1MDAyQndoTk5OSUNxRHFwQWpFcHJWVUdLVnhvYkdVSUpzUjZ1b3N0OHJJY1NcdTAwMkJFQnJZbVpRYm5HRUxKY2xudUdxbVdrS1JkWHNHaHRvc1loUTFKdVFKOTBBcUJxcTRvRS85SVk5a2IvbFx1MDAyQjhpYVJQXHUwMDJCb0RxUHhQdFNWYkU4OWlvVUNta3g0Y3pDdGVaWWc1UW5zeTB6SmQwPSJ9';

  const webViewUri = `${sdkApiUri}?startup-token=${startupToken}`;

  // This ensures that the Luciditi SDK can open external links in the default browser
  const onShouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => {
    if (request.url.startsWith(sdkApiUri)) {
      return true;
    }

    Linking.openURL(request.url);
    return false;
  };

  return (
    <SafeAreaView style={styles.SafeAreaStyle}>
      <Text style={styles.HeaderStyle}>Luciditi WebView Example</Text>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        onMessage={onMessage}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        source={{uri: webViewUri}}
      />
      <View style={styles.MessagesContainerStyle}>
        <Text style={styles.SubHeaderStyle}>Messages</Text>
        <FlatList
          data={messages}
          keyExtractor={item => item.key.toString()}
          renderItem={item => (
            <Text style={styles.MessageStyle}>{item.item.data}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaStyle: {
    flex: 1,
    backgroundColor: '#f5f7fc',
  },
  HeaderStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
  SubHeaderStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  MessagesContainerStyle: {
    height: 90,
    margin: 5,
  },
  MessageStyle: {
    color: '#000000',
  },
});

export default App;

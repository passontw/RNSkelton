import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Text } from '@react-navigation/elements';
import { useAppDispatch, useAppSelector } from '@/navigation/store/hooks';
import { signInAction } from '@/navigation/store/actions/authActions';
import types from '@/navigation/store/constants/actionTypes';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) =>
    state.fetching.pendingActionTypes.includes(types.SIGN_IN),
  );
  const { message } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('錯誤', '請輸入使用者名稱和密碼');
      return;
    }
    dispatch(signInAction({ username: username.trim(), password }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>歡迎登入</Text>
        <Text style={styles.subtitle}>請輸入您的帳號密碼</Text>

        <View style={styles.hintContainer}>
          <Text style={styles.hint}>測試帳號</Text>
          <Text style={styles.hintText}>使用者名稱: demo</Text>
          <Text style={styles.hintText}>密碼: password</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="使用者名稱"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="密碼"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
          onSubmitEditing={handleLogin}
        />

        {message ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{message}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            isLoading && styles.buttonDisabled,
            pressed && !isLoading && styles.buttonPressed,
          ]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>登入</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  hintContainer: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  hint: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 13,
    color: '#666',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
    textAlign: 'center',
  },
});

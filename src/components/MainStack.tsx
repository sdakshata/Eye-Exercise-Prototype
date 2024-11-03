import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { useAuthStore } from "../stores/authStore";

import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ExerciseScreen } from "./screens/ExerciseScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName={isAuthenticated ? "Home" : "Login"}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#3B82F6",
                    },
                    headerTintColor: "white",
                    headerShown: true,
                }}
            >
                {!isAuthenticated ? (
                    <>
                        <StackNavigator.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <StackNavigator.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        <StackNavigator.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ title: "Eye Care Pro" }}
                        />
                        <StackNavigator.Screen
                            name="Exercise"
                            component={ExerciseScreen}
                            options={{ title: "Exercise" }}
                        />
                        <StackNavigator.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{ title: "Profile" }}
                        />
                    </>
                )}
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
};
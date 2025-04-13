import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import { PieChart, LineChart, BarChart } from 'react-native-chart-kit';

import HomeIcon from './assets/home.png';
import GraphIcon from './assets/graph.png';
import GoalIcon from './assets/goal.png';
import ProfileIcon from './assets/profile.png';

const screenWidth = Dimensions.get('window').width;

// Financial data for a middle-class college student
const monthlyIncome = 2400;  // Part-time job + allowance
const totalSpent = 1850;     // Total spent this month
const remaining = monthlyIncome - totalSpent;
const spendingPercent = (totalSpent / monthlyIncome) * 100;

// Category spending breakdown
const spendingData = [
  { name: 'Food', population: 600, color: '#4F46E5', legendFontColor: '#7F7F7F', legendFontSize: 13 },
  { name: 'Rent', population: 800, color: '#10B981', legendFontColor: '#7F7F7F', legendFontSize: 13 },
  { name: 'Bills', population: 250, color: '#F59E0B', legendFontColor: '#7F7F7F', legendFontSize: 13 },
  { name: 'Fun', population: 200, color: '#EF4444', legendFontColor: '#7F7F7F', legendFontSize: 13 },
];

// Weekly spending data
const currentSpending = [300, 500, 900, 1200, 1500, 1700, 1850];
const recommendedSpending = [300, 600, 900, 1200, 1500, 1800, 2100];

// Weekly budget
const weeklyBudget = Math.round(monthlyIncome / 4.33);  // ~554 per week

function Card({ children }) {
  return (
    <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
      {children}
    </View>
  );
}

function DashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Dashboard</Text>

        <Card>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, textAlign: 'center' }}>Monthly Budget</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 16 }}>Monthly Income:</Text>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>${monthlyIncome}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 16 }}>Total Spent:</Text>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>${totalSpent}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 16 }}>Remaining:</Text>
            <Text style={{ fontSize: 16, fontWeight: '600', color: remaining < 0 ? '#EF4444' : '#10B981' }}>${remaining}</Text>
          </View>
          
          <View style={{ height: 20, width: '100%', backgroundColor: '#E5E7EB', borderRadius: 10 }}>
            <View 
              style={{ 
                width: `${Math.min(spendingPercent, 100)}%`, 
                height: '100%', 
                backgroundColor: spendingPercent > 90 ? '#EF4444' : spendingPercent > 75 ? '#F59E0B' : '#4F46E5', 
                borderRadius: 10 
              }} 
            />
          </View>
          
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4, textAlign: 'center' }}>
            {spendingPercent.toFixed(1)}% of monthly budget used
          </Text>
        </Card>

        <Card>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, textAlign: 'center' }}>Spending Summary</Text>
          <PieChart
            data={spendingData}
            width={screenWidth - 64}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card>

        <Card>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, textAlign: 'center' }}>Monthly Spending Pace</Text>
          <LineChart
            data={{
              labels: ['1', '2', '3', '4', 'Now', '6', '7'],
              datasets: [
                {
                  data: recommendedSpending,
                  color: () => '#10B981',
                  strokeWidth: 2,
                },
                {
                  data: currentSpending,
                  color: () => '#4F46E5',
                  strokeWidth: 2,
                },
              ],
              legend: ['Recommended', 'You']
            }}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: () => '#6B7280',
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </Card>

        <Card>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, textAlign: 'center' }}>Insights</Text>
          <Text style={{ marginBottom: 4, textAlign: 'center' }}>• You spent 15% more on food this week</Text>
          <Text style={{ marginBottom: 4, textAlign: 'center', color: '#EF4444', fontWeight: '600' }}>• Klarna purchases increased by 40% this month</Text>
          <Text style={{ marginBottom: 4, textAlign: 'center' }}>• You're 77% through your monthly budget</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function AnalyzeScreen() {
  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [result, setResult] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const [isBadPurchase, setIsBadPurchase] = useState(false);
  
  // Average spending per category
  const avgFood = 150; // per week
  const avgEntertainment = 50; // per week
  const avgRent = 200; // per week
  const avgBills = 62.5; // per week
  const weeklyTotal = avgFood + avgEntertainment + avgRent + avgBills;
  
  const analyzePurchase = () => {
    const amount = parseFloat(purchaseAmount);
    if (isNaN(amount)) {
      setResult('Enter valid amount.');
      setShowGraph(false);
      return;
    }
    
    setShowGraph(true);
    
    // Determine if purchase is potentially problematic
    const isHighValue = amount > 100;
    const isKlarna = purchaseName.toLowerCase().includes('klarna');
    const isNonEssential = !purchaseName.toLowerCase().includes('groceries') && 
                          !purchaseName.toLowerCase().includes('rent') && 
                          !purchaseName.toLowerCase().includes('bill');
    const exceedsBudget = amount > remaining;
    
    // Calculate risk score
    let riskScore = 0;
    if (isHighValue) riskScore += 1;
    if (isKlarna) riskScore += 2;
    if (isNonEssential) riskScore += 1;
    if (exceedsBudget) riskScore += 3;
    
    const isBad = riskScore >= 2 || exceedsBudget;
    setIsBadPurchase(isBad);
    
    if (isBad) {
      setResult('This a bad financial decision. ' + 
                (isKlarna ? 'Klarna usage is hurtful long term. ' : '') +
                (exceedsBudget ? 'The price is out of budget. ' : '') +
                (isNonEssential && isHighValue ? 'Due to it being non essential, please avoid.' : ''));
    } else {
      setResult('This is a fine financial decision, happy spending!');
    }
  };

  // Create data for visualization
  const createBudgetImpactData = () => {
    const amount = parseFloat(purchaseAmount) || 0;
    
    // Calculate what percent of weekly budget this would be
    const percentOfWeekly = (amount / weeklyBudget) * 100;
    
    return [
      {
        name: 'This Purchase',
        amount: amount,
        color: isBadPurchase ? '#EF4444' : '#4F46E5',
      },
      {
        name: 'Rent',
        amount: avgRent,
        color: '#10B981',
      },
      {
        name: 'Food',
        amount: avgFood,
        color: '#F59E0B',
      },
      {
        name: 'Bills',
        amount: avgBills,
        color: '#4338CA',
      },
      {
        name: 'Entertainment',
        amount: avgEntertainment,
        color: '#EC4899',
      },
    ];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 18, marginBottom: 16, textAlign: 'center' }}>Analyze a Purchase</Text>

        <TextInput
          placeholder="Purchase (ex., Chick fil a)"
          value={purchaseName}
          onChangeText={setPurchaseName}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: '100%', padding: 12, marginBottom: 12 }}
        />

        <TextInput
          placeholder="Amount (USD)"
          value={purchaseAmount}
          onChangeText={setPurchaseAmount}
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: '100%', padding: 12, marginBottom: 12 }}
        />

        <TouchableOpacity onPress={analyzePurchase} style={{ backgroundColor: '#4F46E5', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Analyze</Text>
        </TouchableOpacity>

        {result !== '' && (
          <Text style={{ marginTop: 20, fontSize: 16, color: result.includes('bad') ? '#EF4444' : '#10B981', textAlign: 'center' }}>{result}</Text>
        )}
        
        {showGraph && (
          <View style={{ marginTop: 20, width: '100%' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, textAlign: 'center' }}>
              Budget Distribution
            </Text>
            
            <BarChart
              data={{
                labels: ['This', 'Rent', 'Food', 'Bills', 'Fun'],
                datasets: [
                  {
                    data: createBudgetImpactData().map(item => item.amount),
                    colors: createBudgetImpactData().map(item => () => item.color)
                  }
                ]
              }}
              width={screenWidth - 40}
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: () => '#6B7280',
                style: {
                  borderRadius: 16
                },
                barPercentage: 0.7,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            
            <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 8, textAlign: 'center' }}>
              {`This purchase is ${parseFloat(purchaseAmount || 0) > weeklyBudget * 0.25 ? 'significant compared to' : 'within normal range for'} your weekly expenses`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function GoalsScreen() {
  const [budget, setBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const value = parseFloat(budget);
    if (isNaN(value) || value <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid positive budget.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>Set a Weekly Budget</Text>

        <TextInput
          placeholder={`Enter weekly budget ($ / Week)`}
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: '100%', padding: 12, marginVertical: 16 }}
        />

        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#10B981', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Set Budget</Text>
        </TouchableOpacity>

        {submitted && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{margin: 10, fontSize: 16, color: '#4F46E5', textAlign: 'center' }}> Budget set!</Text>
            
            <Card style={{marginTop: 16, width: '100%' }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, textAlign: 'center' }}>Budget Comparison</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 16 }}>Your Budget:</Text>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>${budget}/week</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 16 }}>Recommended:</Text>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>${weeklyBudget}/week</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 16 }}>Difference:</Text>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600',
                  color: parseFloat(budget) < weeklyBudget * 0.8 ? '#EF4444' : parseFloat(budget) > weeklyBudget * 1.2 ? '#F59E0B' : '#10B981'
                }}>${(parseFloat(budget) - weeklyBudget).toFixed(2)}/week</Text>
              </View>
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }) {
  const handleSignOut = () => {
    navigation.replace('Landing'); // Navigate to Landing screen
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Profile</Text>
        <TouchableOpacity onPress={handleSignOut} style={{ backgroundColor: 'red', borderRadius: 8, padding: 15, alignItems: 'center', width: '100%', maxWidth: 200 }}>
          <Text style={{ color: 'white', fontWeight: '600', fontFamily: 'Inter' }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function LandingScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAccess = () => {
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#4F46E5', fontFamily: 'Inter' }}>SpendSmart</Text>
        <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 24, marginTop: 10, fontFamily: 'Inter' }}>Track, budget, and save smarter every day.</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: '100%', padding: 12, marginBottom: 12, fontFamily: 'Inter' }}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: '100%', padding: 12, marginBottom: 20, fontFamily: 'Inter' }}
        />

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={handleAccess} style={{ backgroundColor: '#4F46E5', padding: 12, borderRadius: 8, flex: 0.48, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '600', fontFamily: 'Inter' }}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAccess} style={{ backgroundColor: '#10B981', padding: 12, borderRadius: 8, flex: 0.48, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '600', fontFamily: 'Inter' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconSource;
          if (route.name === 'Home') iconSource = HomeIcon;
          else if (route.name === 'Analyze') iconSource = GraphIcon;
          else if (route.name === 'Goals') iconSource = GoalIcon;
          else if (route.name === 'Profile') iconSource = ProfileIcon;
          return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          height: Platform.OS === 'ios' ? 80 : 60
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Analyze" component={AnalyzeScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
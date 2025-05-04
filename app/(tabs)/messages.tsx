import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';
import { MessageCircle, Search, Send } from 'lucide-react-native';

// Mock conversations data
const CONVERSATIONS = [
  {
    id: '1',
    name: 'Alex Thompson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    lastMessage: 'I'll be there in 10 minutes',
    timestamp: '10:23 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Maria Garcia',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    lastMessage: 'Thanks for the charge!',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'James Wilson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
    lastMessage: 'What's your current battery level?',
    timestamp: 'Yesterday',
    unread: 0,
  },
];

// Mock messages data for conversation with ID '1'
const MESSAGES = [
  {
    id: 'm1',
    text: 'Hey, I need a charge for my car. Are you available?',
    sender: 'user',
    timestamp: '10:05 AM',
  },
  {
    id: 'm2',
    text: 'Yes, I'm available. Where are you located?',
    sender: 'other',
    timestamp: '10:07 AM',
  },
  {
    id: 'm3',
    text: 'I'm at the downtown parking garage, level 2',
    sender: 'user',
    timestamp: '10:10 AM',
  },
  {
    id: 'm4',
    text: 'Perfect, I can be there in about 10 minutes. My car is a blue Tesla Model 3',
    sender: 'other',
    timestamp: '10:12 AM',
  },
  {
    id: 'm5',
    text: 'Great! I'll wait for you near the entrance. I have a red Nissan Leaf',
    sender: 'user',
    timestamp: '10:15 AM',
  },
  {
    id: 'm6',
    text: 'I'll be there in 10 minutes',
    sender: 'other',
    timestamp: '10:23 AM',
  },
];

/**
 * Messages screen component
 */
export default function MessagesScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  
  // Get background color based on theme
  const backgroundColor = isDark ? colors.background.dark : colors.background.light;
  
  // Filtered conversations based on search
  const filteredConversations = CONVERSATIONS.filter(
    conversation => conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Render conversation item
  const renderConversationItem = ({ item }: { item: typeof CONVERSATIONS[0] }) => (
    <TouchableOpacity
      style={[
        styles.conversationItem,
        selectedConversation === item.id && {
          backgroundColor: isDark ? colors.grey[800] : colors.grey[100],
        },
      ]}
      onPress={() => setSelectedConversation(item.id)}
    >
      <View style={styles.avatarContainer}>
        {/* Avatar Image */}
        <View style={styles.avatar}>
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.name}
              style={{ width: '100%', height: '100%', borderRadius: 20 }}
            />
          ) : (
            <MessageCircle size={20} color={colors.white} />
          )}
        </View>
        
        {/* Unread indicator */}
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text variant="caption" color={colors.white} style={styles.unreadText}>
              {item.unread}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.conversationDetails}>
        <View style={styles.conversationHeader}>
          <Text variant="body" weight="semibold" numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="caption" color={isDark ? colors.grey[500] : colors.grey[600]}>
            {item.timestamp}
          </Text>
        </View>
        <Text
          variant="body-sm"
          color={isDark ? colors.grey[400] : colors.grey[600]}
          numberOfLines={1}
          style={styles.lastMessage}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  // Render message bubble
  const renderMessage = ({ item }: { item: typeof MESSAGES[0] }) => {
    const isUser = item.sender === 'user';
    
    return (
      <View
        style={[
          styles.messageBubble,
          isUser
            ? [styles.userMessage, { backgroundColor: colors.primary[isDark ? 700 : 500] }]
            : [styles.otherMessage, { backgroundColor: isDark ? colors.grey[800] : colors.grey[200] }],
        ]}
      >
        <Text
          variant="body-sm"
          color={isUser ? colors.white : isDark ? colors.white : colors.black}
        >
          {item.text}
        </Text>
        <Text
          variant="caption"
          color={isUser ? 'rgba(255,255,255,0.7)' : isDark ? colors.grey[500] : colors.grey[600]}
          style={styles.messageTimestamp}
        >
          {item.timestamp}
        </Text>
      </View>
    );
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text variant="h2" weight="bold">
          Messages
        </Text>
      </View>
      
      <View style={styles.content}>
        {/* Conversations List */}
        <View style={[
          styles.conversationsContainer,
          { borderRightColor: isDark ? colors.grey[800] : colors.grey[200] }
        ]}>
          <View style={styles.searchContainer}>
            <Search size={18} color={isDark ? colors.grey[400] : colors.grey[500]} />
            <TextInput
              style={[
                styles.searchInput,
                { color: isDark ? colors.white : colors.black }
              ]}
              placeholder="Search"
              placeholderTextColor={isDark ? colors.grey[500] : colors.grey[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {filteredConversations.length > 0 ? (
            <FlatList
              data={filteredConversations}
              renderItem={renderConversationItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.conversationsList}
            />
          ) : (
            <View style={styles.emptyConversations}>
              <MessageCircle size={40} color={isDark ? colors.grey[700] : colors.grey[300]} />
              <Text
                variant="body"
                align="center"
                color={isDark ? colors.grey[500] : colors.grey[600]}
                style={styles.emptyConversationsText}
              >
                No conversations found
              </Text>
            </View>
          )}
        </View>
        
        {/* Chat Area */}
        <View style={styles.chatContainer}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <View style={[
                styles.chatHeader,
                { borderBottomColor: isDark ? colors.grey[800] : colors.grey[200] }
              ]}>
                <View style={styles.chatHeaderAvatar}>
                  <img 
                    src={CONVERSATIONS.find(c => c.id === selectedConversation)?.avatar}
                    alt="Avatar"
                    style={{ width: '100%', height: '100%', borderRadius: 16 }}
                  />
                </View>
                <Text variant="body" weight="semibold">
                  {CONVERSATIONS.find(c => c.id === selectedConversation)?.name}
                </Text>
              </View>
              
              {/* Messages */}
              <FlatList
                data={MESSAGES}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                inverted
                showsVerticalScrollIndicator={false}
              />
              
              {/* Input Area */}
              <View style={[
                styles.inputContainer,
                { backgroundColor: isDark ? colors.grey[900] : colors.white }
              ]}>
                <TextInput
                  style={[
                    styles.messageInput,
                    { color: isDark ? colors.white : colors.black }
                  ]}
                  placeholder="Type a message..."
                  placeholderTextColor={isDark ? colors.grey[500] : colors.grey[400]}
                  value={messageText}
                  onChangeText={setMessageText}
                  multiline
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    { backgroundColor: messageText.trim() ? colors.primary[500] : isDark ? colors.grey[800] : colors.grey[300] }
                  ]}
                  onPress={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <Send size={20} color={colors.white} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.noChatSelected}>
              <MessageCircle size={48} color={isDark ? colors.grey[700] : colors.grey[300]} />
              <Text
                variant="h4"
                weight="semibold"
                style={styles.noChatTitle}
              >
                No Conversation Selected
              </Text>
              <Text
                variant="body"
                align="center"
                color={isDark ? colors.grey[500] : colors.grey[600]}
                style={styles.noChatText}
              >
                Select a conversation from the list to start chatting
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing[2],
    paddingBottom: spacing[2],
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  conversationsContainer: {
    width: '30%',
    borderRightWidth: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[1.5],
    height: 40,
    marginHorizontal: spacing[1],
    marginBottom: spacing[1],
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: spacing[1],
    fontSize: 14,
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[1.5],
    borderRadius: 8,
    marginHorizontal: spacing[1],
    marginBottom: spacing[0.5],
  },
  avatarContainer: {
    marginRight: spacing[1.5],
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.error[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    fontSize: 10,
  },
  conversationDetails: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  lastMessage: {
    flex: 1,
  },
  emptyConversations: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[2],
  },
  emptyConversationsText: {
    marginTop: spacing[1],
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[2],
    borderBottomWidth: 1,
  },
  chatHeaderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[1.5],
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing[2],
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing[1.5],
    borderRadius: 16,
    marginBottom: spacing[1],
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageTimestamp: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[1.5],
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  messageInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    padding: spacing[1],
    paddingHorizontal: spacing[1.5],
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    marginRight: spacing[1],
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noChatSelected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[4],
  },
  noChatTitle: {
    marginTop: spacing[2],
    marginBottom: spacing[1],
  },
  noChatText: {
    maxWidth: '60%',
  },
});
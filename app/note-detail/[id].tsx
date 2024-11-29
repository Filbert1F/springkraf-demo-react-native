import ChipCustom from "@/components/ChipCustom";
import ErrorCustom from "@/components/ErrorCustom";
import HeaderCustom from "@/components/HeaderCustom";
import IconButton from "@/components/IconButtonCustom";
import LoadingCustom from "@/components/LoadingCustom";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useArchiveNote, useDeleteNote, useUnarchiveNote } from "@/api-hooks/menu/mutation";
import { useGetNote } from "@/api-hooks/menu/query";

export default function NoteDetail() {
  const local = useLocalSearchParams();

  const { data, isPending, isError } = useGetNote(
    local.id as string, 
    {
      retry: (failureCount, error) => {
        return error.status !== 'fail';
      },
    }
  )

  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const deleteNoteMutation = useDeleteNote({
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['notes-archived'] })
      queryClient.invalidateQueries({ queryKey: ['notes', local.id] })
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const onPressDelete = () => {
    deleteNoteMutation.mutate({
      noteId: local.id as string
    })
  }

  const archiveNoteMutation = useArchiveNote({
    onSuccess: async (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['notes-archived'] })
      queryClient.invalidateQueries({ queryKey: ['notes', local.id] })
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const onPressArchive = () => {
    archiveNoteMutation.mutate({
      noteId: local.id as string
    })
  }

  const unArchiveNoteMutation = useUnarchiveNote({
    onSuccess: async (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['notes-archived'] })
      queryClient.invalidateQueries({ queryKey: ['notes', local.id] })
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const onPressUnarchive = () => {
    unArchiveNoteMutation.mutate({
      noteId: local.id as string
    })
  }

  if (isPending) return <LoadingCustom />
  if (isError) return <ErrorCustom />

  return (
    <HeaderCustom 
      title={data.data.id} 
      withSearch={false} 
      withExpand={false}
      rightButtons={
        !data.data.archived ? [
          <IconButton 
            icon="delete" 
            onPress={onPressDelete}
          />,
          <IconButton 
            icon="archive" 
            onPress={onPressArchive}
          />
        ] : [
          <IconButton 
            icon="delete" 
            onPress={onPressDelete}
          />,
          <IconButton 
            icon="unarchive" 
            onPress={onPressUnarchive}
          />
        ]
      }
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 32,
        }}
      >
        {data.data.archived &&
          <View style={styles.header}>
            <ChipCustom title="Archived" />
          </View>
        }
        <Text style={styles.title}>
          {data.data.title}
        </Text>
        <Text style={styles.id}>
          {data.data.id}
        </Text>
        <Text style={styles.createdAt}>
          {data.data.createdAt}
        </Text>
        <Text style={styles.text}>
          {data.data.body}
        </Text>
      </ScrollView>
    </HeaderCustom>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  id: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8
  },
  createdAt: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8
  },
  text: {
    color: '#444444',
    marginTop: 16
  },
});

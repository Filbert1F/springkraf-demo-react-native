import { deleteNote } from "@/api/delete-note";
import { archiveNote } from "@/api/archive-note";
import { getNoteId } from "@/api/get-note-id";
import ChipCustom from "@/components/ChipCustom";
import ErrorCustom from "@/components/ErrorCustom";
import HeaderCustom from "@/components/HeaderCustom";
import IconButton from "@/components/IconButtonCustom";
import LoadingCustom from "@/components/LoadingCustom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { unarchiveNote } from "@/api/unarchive-note";

export default function NoteDetail() {
  const local = useLocalSearchParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ['notes', local.id],
    queryFn: () => getNoteId(local.id as string),
    retry: (failureCount, error: any) => {
      return error?.status !== 401;
    },
  })

  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const deleteNoteMutation = useMutation({
    mutationFn: () => deleteNote(local.id as string),
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

  const onPressDelete = () => {
    deleteNoteMutation.mutate()
  }

  const archiveNoteMutation = useMutation({
    mutationFn: () => archiveNote(local.id as string),
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
    archiveNoteMutation.mutate()
  }

  const unArchiveNoteMutation = useMutation({
    mutationFn: () => unarchiveNote(local.id as string),
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
    unArchiveNoteMutation.mutate()
  }

  if (isPending) return <LoadingCustom />
  if (isError) return <ErrorCustom />

  return (
    <HeaderCustom 
      title={data.id} 
      withSearch={false} 
      withExpand={false}
      rightButtons={
        !data.archived ? [
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
        {data.archived &&
          <View style={styles.header}>
            <ChipCustom title="Archived" />
          </View>
        }
        <Text style={styles.title}>
          {data.title}
        </Text>
        <Text style={styles.id}>
          {data.id}
        </Text>
        <Text style={styles.createdAt}>
          {data.createdAt}
        </Text>
        <Text style={styles.text}>
          {data.body}
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

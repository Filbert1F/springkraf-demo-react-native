import { getNotes } from "@/api/get-notes";
import { getNotesArchived } from "@/api/get-notes-archived";
import { postNote } from "@/api/post-note";
import CardCustom from "@/components/CardCustom";
import EmptyNotes from "@/components/EmptyNotes";
import ErrorCustom from "@/components/ErrorCustom";
import FAB from "@/components/FAB";
import HeaderCustom from "@/components/HeaderCustom";
import IconButton from "@/components/IconButtonCustom";
import LoadingCustom from "@/components/LoadingCustom";
import ModalCustom from "@/components/ModalCustom";
import TextAreaCustom from "@/components/TextAreaCustom";
import TextInputCustom from "@/components/TextInputCustom";
import { NoteType } from "@/types/note";
import removeToken from "@/utils/remove-token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

type Props = {
  endpoint: 'notes' | 'notes-archived',
}

export default function GetNotes({
  endpoint='notes'
}: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  const local = useLocalSearchParams();
  
  const [searchValue, setSearchValue] = useState(local.title as string);

  const { data, isPending, isError, error } = useQuery({
    queryKey: [endpoint, local.title],
    queryFn: () => endpoint === 'notes' ? 
      getNotes(local.title as string) : 
      getNotesArchived(local.title as string),
    retry: (failureCount, error: any) => {
      return error?.status !== 401;
    },
  })

  const router = useRouter();

  const logout = useMutation({
    mutationFn: () => removeToken(),
    onSuccess: () => {
      router.replace('/');
      queryClient.clear()
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const onSubmit = () => {
    logout.mutate()
  }

  const queryClient = useQueryClient()

  const addNoteMutation = useMutation({
    mutationFn: () => postNote(titleValue, bodyValue),
    onSuccess: async (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: [endpoint] })
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const openCloseModal = () => {
    if (modalOpen) {
      setModalOpen(false)
    } else {
      setModalOpen(true)
    }
  }

  const onPressAdd = () => {
    addNoteMutation.mutate()
  }

  const onSubmitEditing = () => {
    router.replace(`/${endpoint}?title=${searchValue}`);
  }

  useEffect(() => {
    if (isError) {
      const typedError = error as { status?: number };
      if (typedError.status === 401) {
        removeToken();
        router.replace('/');
      }
    }
  }, [isError, error, router]);

  if (isPending) return <LoadingCustom />
  if (isError) return <ErrorCustom />

  return (
    <>
      <HeaderCustom 
        title="Search Notes" 
        withBackButton={false} 
        rightButtons={[
          <IconButton 
            icon="logout" 
            onPress={onSubmit} 
          />
        ]}
        onSubmit={onSubmitEditing}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      >
        {data.length === 0 ? <EmptyNotes /> :
          <FlatList
            data={data}
            renderItem={(dat) => 
              <Link href={`/note-detail/${dat.item.id}`} asChild>
                <CardCustom title={dat.item.title} body={dat.item.body} id={dat.item.id} />
              </Link>
            }
            keyExtractor={item => item.id}
            // contentContainerStyle={{
            //   gap: 16,
            //   padding: 16,
            //   paddingBottom: 32,
            // }}
          />
        }
        <View style={{height: 88}}></View>
      </HeaderCustom>
      <ModalCustom 
        modalVisible={modalOpen} 
        setModalVisible={setModalOpen}
        title={'Add New Note'}
        onConfirm={onPressAdd}
        onCancel={() => {}}
        confirmTitle={'Add'}
        confirmIsLoading={addNoteMutation.isPending}
      >
        <TextInputCustom label='Title' value={titleValue} setValue={setTitleValue} />
        <TextAreaCustom label='Body' value={bodyValue} setValue={setBodyValue} />
      </ModalCustom>
      {endpoint === 'notes' &&
        <FAB 
          icon="add"
          onPress={openCloseModal} 
        />
      }
    </>
  );
}

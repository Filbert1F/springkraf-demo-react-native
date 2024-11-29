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
import removeToken from "@/utils/remove-token";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAddNote } from "@/api-hooks/menu/mutation";
import { useGetArchivedNotes, useGetNotes } from "@/api-hooks/menu/query";

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

  const { data, isPending, isError, error } = endpoint === 'notes' ? useGetNotes(
    local.title as string, 
    'title',
    {
      retry: (failureCount, error) => {
        return error.status !== 'fail';
      },
    }
  ) : useGetArchivedNotes(
    local.title as string, 
    'title',
    {
      retry: (failureCount, error) => {
        return error.status !== 'fail';
      },
    }
  );

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

  const addNoteMutation = useAddNote({
    onSuccess: async (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: [endpoint] })
      setTitleValue('')
      setBodyValue('')
    },
    onError: async (error) => {
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
    addNoteMutation.mutate({ 
      title: titleValue, 
      body: bodyValue 
    })
  }

  const onSubmitEditing = () => {
    router.replace(`/${endpoint}?title=${searchValue}`);
  }

  useEffect(() => {
    if (isError) {
      if (error.status === "fail") {
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
        {data.data.length === 0 ? <EmptyNotes /> :
          <FlatList
            data={data.data}
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

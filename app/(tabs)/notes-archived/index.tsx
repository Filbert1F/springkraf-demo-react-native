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
import TextInputCustom from "@/components/TextInputCustom";
import GetNotes from "@/modules/get-notes";
import removeToken from "@/utils/remove-token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";

export default function NotesArchived() {

  return (
    <GetNotes endpoint="notes-archived" />
  );
}

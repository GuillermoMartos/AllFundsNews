export enum noteState {
  DONE = "Done",
  PENDING = "Pending",
  NO_APPLY = "N/A",
}


export interface noteAttributes {
  idNote: string;
  content: string | null;
  title: string | null;
  state: noteState;
}

export interface externalAPINew{
  id: string
title: string
description: string
url: string
author: string
image: string
language: string
published: string
}
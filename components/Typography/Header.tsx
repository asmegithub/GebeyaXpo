import React from "react";

type Props = { lable: string };

export default function Header({ lable }: Props) {
  return <h1>{lable}</h1>;
}

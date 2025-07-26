import { ParentProps } from "solid-js";

import { useFetchUser } from "@/contexts/user";

interface Props extends ParentProps {}

function ProfileProvider(props: Props) {
  useFetchUser();

  return props.children;
}

export { ProfileProvider };

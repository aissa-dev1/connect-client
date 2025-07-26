import clsx from "clsx";
import { ComponentProps, splitProps } from "solid-js";

import styles from "./Container.module.css";

interface Props extends ComponentProps<"div"> {}

function Container(props: Props) {
  const [local, rest] = splitProps(props, ["children", "class"]);

  return (
    <div class={clsx(styles.container, local.class)} {...rest}>
      {local.children}
    </div>
  );
}

export { Container };

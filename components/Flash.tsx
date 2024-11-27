interface Props {
  flash: Record<string, string> | null;
}

export default function Flash(props: Props) {
  return (
    props.flash &&
    (
      <div class={`flash ${Object.keys(props.flash)[0]}`} role="alert">
        <span class="font-medium mr-2">
          [{`${Object.keys(props.flash)[0].toUpperCase()}`}]
        </span>
        {Object.values(props.flash)[0]}
      </div>
    )
  );
}

import './index.less';

export default function Block(props: { title: string; children: JSX.Element[] | JSX.Element }) {
  return (
    <div className="block-item">
      <div className="title">{props.title}</div>
      <div className="content">{props.children}</div>
    </div>
  );
}

import './index.less';

export default function Block(props) {
  return (
    <div className="block-item">
      <div className="title">{props.title}</div>
      <div className="content">{props.children}</div>
    </div>
  );
}

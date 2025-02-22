interface IProps {
  modal: React.ReactNode;
  children: React.ReactNode;
}

//next.js featuare (it does not integrate into FSD)
//Layout to show "modal" slot together with children
export default function ParallerRouteLayout({ children, modal }: IProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

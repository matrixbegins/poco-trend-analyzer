import { Layout } from "./Layout";

interface RouteWrapperProps {
  component: React.ComponentType;
  useLayout?: boolean;
}

export function RouteWrapper({
  component: Component,
  useLayout = true
}: RouteWrapperProps) {
  if (useLayout) {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  }

  return <Component />;
}
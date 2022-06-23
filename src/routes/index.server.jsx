import FeaturedCollections from "../components/FeaturedCollections.server";
import Layout from "../components/Layout.server";
import { Suspense } from "react";

const Home = () => {
  return (
    <Layout>
      <Suspense>
        <FeaturedCollections />
      </Suspense>
    </Layout>
  );
};

export default Home;

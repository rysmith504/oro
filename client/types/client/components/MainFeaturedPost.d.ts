/// <reference types="react" />
interface MainFeaturedPostProps {
    post: {
        description?: string;
        image?: string;
        title?: string;
    };
}
export default function MainFeaturedPost(props: MainFeaturedPostProps): JSX.Element;
export {};

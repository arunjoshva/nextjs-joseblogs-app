type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    description?: string;
}

export default function SectionHeading({
    eyebrow,
    title,
    description
}: SectionHeadingProps){
    return(
        <div className="mb-10">
            {eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    {eyebrow}
                </p>
            )}

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {title}
            </h2>

            {description && (
                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
                    {description}
                </p>
            )}
        </div>
    );
}
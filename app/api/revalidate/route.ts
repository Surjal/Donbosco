import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { paths, secret } = await request.json();

    if (secret !== process.env.NEXT_PUBLIC_MY_REVALIDATE_TOKEN) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json(
        { message: "Array of paths required" },
        { status: 400 },
      );
    }

    // Process all paths
    paths.forEach((path) => {
      revalidatePath(path);
      console.log(`Revalidated: ${path}`);
    });
    revalidatePath("/", "page");
    revalidatePath("/", "layout");
    revalidatePath("/index");
    return NextResponse.json({ revalidated: true, count: paths.length });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}

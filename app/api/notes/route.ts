import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const search = request.nextUrl.searchParams.get("search") ?? "";
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const rawTag = request.nextUrl.searchParams.get("tag") ?? "";
    const tag = rawTag === "All" ? "" : rawTag;

    const res = await api("/notes", {
      params: {
        ...(search !== "" && { search }),
        page,
        perPage: 12,
        ...(tag && { tag }),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) {
      const error = err as ApiError;
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error?.response?.data.error ?? error.message },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (err as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const cookieStore = await cookies();

    const res = await api.post("/notes", body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    if (isAxiosError(err)) {
      const error = err as ApiError;
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error?.response?.data.error ?? error.message },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (err as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

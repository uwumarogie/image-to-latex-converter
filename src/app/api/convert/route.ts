import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import * as util from "node:util";
import { exec } from "child_process";

const execPromise = util.promisify(exec);
const writeFilePromise = util.promisify(fs.writeFile);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const appId = process.env.MATHPIX_APP_ID as string;
    const appKey = process.env.MATHPIX_APP_KEY as string;

    if (!file || !appId || !appKey) {
      return NextResponse.json(
        { error: "App ID, App Key, and image file are required" },
        { status: 400 },
      );
    }

    const imagePath = `/tmp/${file.name}`;
    await writeFilePromise(imagePath, Buffer.from(await file.arrayBuffer()));

    const curlCommand = `curl -X POST https://api.mathpix.com/v3/text \
      -H 'app_id: ${appId}' \
      -H 'app_key: ${appKey}' \
      --form 'file=@${imagePath}' \
      --form 'options_json="{\\"math_inline_delimiters\\": [\\"$\\", \\"$\\"], \\"rm_spaces\\": true}"'`;

    const { stdout } = await execPromise(curlCommand);

    const response = JSON.parse(stdout);

    return NextResponse.json(response, {status: 200});
  } catch (err: unknown) {
    console.error("Error processing request:", err);
    return new NextResponse("Internal Server Error", {
      status: 401,
      statusText: `Error: ${err}`,
    });
  }
}

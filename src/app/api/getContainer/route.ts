
import Docker from 'dockerode';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

interface FileDetails {
  size: number;
  modifiedAt: Date;
}

//Function to get file details in a Docker container
async function getFileDetailsInContainer(containerId: string, folderPath: string): Promise<FileDetails[] | null> {
  try {
    const docker = new Docker();
    const container = docker.getContainer(containerId);

    // Check if the container is running
    const containerInfo = await container.inspect();
    if (!containerInfo.State.Running) {
      // Start the container if it's not running
      await container.start();
    }

    // Create an exec instance in the container
    const exec = await container.exec({
      Cmd: ['stat', '-c', '%n,%s,%Y', folderPath + '/*'], // Command to get file details (name, size, modified time)
      AttachStdout: true,
      AttachStderr: true,
    });

    // Start the exec instance
    const stream = await exec.start({});

    // Wait for the command to complete and capture its output
    const output = await new Promise<string>((resolve, reject) => {
      let data = '';
      stream.on('data', chunk => {
        data += chunk;
      });
      stream.on('end', () => resolve(data));
      stream.on('error', err => reject(err));
    });

    // Process the output and extract file details for each file
    const fileDetailsList: FileDetails[] = output.trim().split('\n').map(line => {
      const [name, size, modifiedAt] = line.split(',');
      return {
        name,
        size: parseInt(size),
        modifiedAt: new Date(parseInt(modifiedAt) * 1000),
      };
    });

    // Return file details list
    return fileDetailsList;
  } catch (err) {
    console.error('Error getting file details in container:', err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const { containerId, filePath }: { containerId: string; filePath: string } = await req.json();

  if (!containerId || !filePath) {
    return NextResponse.json({
      msg: "containerId or filePath to bhej de yaar"
    }, {
      status: 404
    })
  }

  const FileDetails = await getFileDetailsInContainer(containerId, filePath);

  if (!FileDetails) {
    return NextResponse.json({ msg: "didnt get FileDetails" }, { status: 500 });
  }

  return NextResponse.json({
    FileDetails
  })
}

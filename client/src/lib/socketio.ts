import { Socket, connect as connectIo } from "socket.io-client";

let socket: Socket;

function connect(): Promise<Socket> {
  return new Promise((resolve, reject) => {
    if (!socket) {
      // @ts-ignore
      const connectionURL = import.meta.env.DEV
        ? location.href.slice(0, location.href.indexOf("8080")) +
          "8081" +
          location.href.slice(location.href.indexOf("8080") + 4)
        : "https://sockey-1.smart09codes.repl.co/";
      console.log('attempting to connect to:', connectionURL);
      socket = connectIo(connectionURL, {transports: ['websocket']});
      socket.on("connect", () => {
        console.log("connected");
        resolve(socket);
      });
      socket.on("disconnect", () => {
        console.log("disconnected");
      });
			socket.on("connect_error", (err) => {
				reject(err);
			});
    } else {
      resolve(socket);
    }
  });
}
// alert(location.href.slice(0, location.href.indexOf('8080')) + '8081' + location.href.slice(location.href.indexOf('8080')))
export default connect;
export { socket };

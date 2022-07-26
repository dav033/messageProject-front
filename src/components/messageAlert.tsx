export default function MessageAlert ({ noReadedMessages }) {
  // console.log(noReadedMessages.length)
  return noReadedMessages !== undefined && noReadedMessages.length > 0
    ? (
    <div
      style={{
        fontSize: '14px',
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: '100%',
        width: '23px',
        height: '23px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '5px',
        right: '15px'
      }}
    >
      {noReadedMessages.length}
    </div>
      )
    : null
}

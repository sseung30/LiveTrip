interface ParticipantCounterProps {
  participantCount: number;
  onParticipantChange: (count: number) => void;
}

export default function ParticipantCounter({
  participantCount,
  onParticipantChange,
}: ParticipantCounterProps) {
  return (
    <div>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='text-base font-semibold text-gray-900'>참여 인원 수</h3>
        <div className='flex items-center rounded-xl border border-gray-200 bg-white p-2'>
          <button
            className='flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-50'
            onClick={() => {
              onParticipantChange(Math.max(1, participantCount - 1));
            }}
          >
            -
          </button>
          <input
            type='number'
            value={participantCount}
            className='mx-3 w-12 rounded-full text-center font-medium text-gray-900 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            min='1'
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'textfield',
            }}
            onChange={(e) => {
              onParticipantChange(Math.max(1, parseInt(e.target.value) || 1));
            }}
          />
          <button
            className='flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-50'
            onClick={() => {
              onParticipantChange(participantCount + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

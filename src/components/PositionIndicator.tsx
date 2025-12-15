interface PositionIndicatorProps {
  current: number;
  total: number;
}

const PositionIndicator = ({ current, total }: PositionIndicatorProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-light tracking-wider bg-black/30 px-3 py-1 rounded backdrop-blur-sm">
      {current} / {total}
    </div>
  );
};

export default PositionIndicator;

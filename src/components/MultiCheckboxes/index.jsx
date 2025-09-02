import React from 'react';

const MultiCheckboxes = ({
  label,
  options = [],
  selectedValues = [],
  onChange,
  getDisplayName,
  containerStyle = {},
  itemStyle = {},
  selectedColor = '#24b158ff',
  unselectedColor = '#f3f4f6'
}) => {
  const handleItemClick = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(item => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const getItemDisplayName = (option) => {
    if (getDisplayName && typeof getDisplayName === 'function') {
      return getDisplayName(option);
    }
    return option;
  };

  return (
    <div className="text-left">
      {label && <strong>{label}:</strong>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px',
        marginTop: '12px',
        ...containerStyle
      }}>
        {options.map(option => (
          <div
            key={option}
            onClick={() => handleItemClick(option)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '80px',
              backgroundColor: selectedValues.includes(option) ? selectedColor : unselectedColor,
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              padding: '8px',
              transition: 'all 0.2s ease',
              userSelect: 'none',
              ...itemStyle
            }}
          >
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              color: selectedValues.includes(option) ? 'white' : '#374151',
              textAlign: 'center',
              marginBottom: '8px'
            }}>
              {getItemDisplayName(option)}
            </span>
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleItemClick(option)}
              style={{ pointerEvents: 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCheckboxes;
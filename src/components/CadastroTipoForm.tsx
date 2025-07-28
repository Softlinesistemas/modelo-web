'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface OptionDef {
  value: string;
  label: string;
}

export interface FieldDef {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: OptionDef[];
  fields?: FieldDef[];
  max?: number;
  prefix?: string;
}

interface CadastroTipoFormProps {
  tipo: string;
  fields: FieldDef[];
  initialValues?: Record<string, any>;
}

const CadastroTipoForm: React.FC<CadastroTipoFormProps> = ({ 
  tipo, 
  fields, 
  initialValues = {} 
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [groupCounters, setGroupCounters] = useState<Record<string, number>>({});

  // Initialize group counters
  useEffect(() => {
    const counters: Record<string, number> = {};
    fields.forEach(field => {
      if (field.type === 'group' && field.name) {
        counters[field.name] = formData[field.name]?.length || 1;
      }
    });
    setGroupCounters(counters);
  }, [fields]);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem(`cadastro_${tipo}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        
        const counters: Record<string, number> = {};
        fields.forEach(field => {
          if (field.type === 'group' && field.name) {
            counters[field.name] = parsed[field.name]?.length || 1;
          }
        });
        setGroupCounters(counters);
      } catch {
        console.warn('Erro ao ler dados locais de', tipo);
      }
    }
  }, [tipo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      setFormData(prev => {
        const prevValue = prev[name];
        let newArray: string[] = [];
        
        if (Array.isArray(prevValue)) {
          newArray = [...prevValue];
        }
        
        if (target.checked) {
          if (!newArray.includes(value)) {
            newArray.push(value);
          }
        } else {
          newArray = newArray.filter(v => v !== value);
        }
        
        return { ...prev, [name]: newArray };
      });
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGroupChange = (groupName: string, index: number, fieldName: string, value: any) => {
    setFormData(prev => {
      const groupData = prev[groupName] || [];
      const newGroupData = [...groupData];
      
      if (!newGroupData[index]) {
        newGroupData[index] = {};
      }
      
      newGroupData[index][fieldName] = value;
      return { ...prev, [groupName]: newGroupData };
    });
  };

  const addGroupItem = (groupName: string, max: number) => {
    setGroupCounters(prev => {
      if (prev[groupName] >= max) return prev;
      return { ...prev, [groupName]: prev[groupName] + 1 };
    });
  };

  const removeGroupItem = (groupName: string) => {
    setGroupCounters(prev => {
      if (prev[groupName] <= 1) return prev;
      
      setFormData(prevData => {
        const groupData = [...(prevData[groupName] || [])];
        groupData.pop();
        return { ...prevData, [groupName]: groupData };
      });
      
      return { ...prev, [groupName]: prev[groupName] - 1 };
    });
  };

  const renderField = (field: FieldDef) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="flex flex-col mb-4">
            <label htmlFor={field.name} className="mb-1 font-medium">
              {field.label}{field.required && ' *'}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              value={value}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              rows={4}
            />
          </div>
        );
      
      case 'select':
        return (
          <div key={field.name} className="flex flex-col mb-4">
            <label htmlFor={field.name} className="mb-1 font-medium">
              {field.label}{field.required && ' *'}
            </label>
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              value={value}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            >
              <option value="">Selecione...</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      case 'radio':
        return (
          <div key={field.name} className="flex flex-col mb-4">
            <label className="mb-1 font-medium">
              {field.label}{field.required && ' *'}
            </label>
            <div className="space-y-2">
              {field.options?.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={handleChange}
                    className="mr-2"
                    required={field.required}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={field.name} className="flex flex-col mb-4">
            <label className="mb-1 font-medium">
              {field.label}{field.required && ' *'}
            </label>
            <div className="space-y-2">
              {field.options?.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    name={field.name}
                    value={option.value}
                    checked={Array.isArray(value) && value.includes(option.value)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        );
      
      case 'group':
        const groupItems = [];
        const count = groupCounters[field.name] || 1;
        
        for (let i = 0; i < count; i++) {
          groupItems.push(
            <div key={`${field.name}-${i}`} className="border p-4 rounded mb-4">
              <h4 className="font-medium mb-2">Responsável {i + 1}</h4>
              {field.fields?.map(subField => {
                const fieldId = `${field.name}-${i}-${subField.name}`;
                const groupData = formData[field.name] || [];
                const groupItem = groupData[i] || {};
                const fieldValue = groupItem[subField.name] || '';

                return (
                  <div key={fieldId} className="flex flex-col mb-3">
                    <label htmlFor={fieldId} className="mb-1 text-sm">
                      {subField.label}{subField.required && ' *'}
                    </label>
                    {subField.prefix ? (
                      <div className="flex">
                        <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l">
                          {subField.prefix}
                        </span>
                        <input
                          id={fieldId}
                          type={subField.type || 'text'}
                          value={fieldValue}
                          onChange={(e) => handleGroupChange(field.name, i, subField.name, e.target.value)}
                          className="border rounded-r px-3 py-2 flex-1"
                          required={subField.required}
                        />
                      </div>
                    ) : (
                      <input
                        id={fieldId}
                        type={subField.type || 'text'}
                        value={fieldValue}
                        onChange={(e) => handleGroupChange(field.name, i, subField.name, e.target.value)}
                        className="border rounded px-3 py-2"
                        required={subField.required}
                      />
                    )}
                  </div>
                );
              })}
              
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => removeGroupItem(field.name)}
                  className="text-red-600 mt-2 text-sm"
                >
                  Remover
                </button>
              )}
            </div>
          );
        }
        
        return (
          <div key={field.name} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">
                {field.label}{field.required && ' *'}
              </label>
              
              {count < (field.max || 3) && (
                <button
                  type="button"
                  onClick={() => addGroupItem(field.name, field.max || 3)}
                  className="text-blue-600 text-sm"
                >
                  + Adicionar
                </button>
              )}
            </div>
            
            {groupItems}
          </div>
        );
      
      case 'password':
        return (
          <div key={field.name} className="flex flex-col mb-4">
            <label htmlFor={field.name} className="mb-1 font-medium">
              {field.label}{field.required && ' *'}
            </label>
            <input
              id={field.name}
              name={field.name}
              type="password"
              required={field.required}
              value={value}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
        );
      
      default:
        return (
          <div key={field.name} className="flex flex-col mb-4">
            <label htmlFor={field.name} className="mb-1 font-medium">
              {field.label}{field.required && ' *'}
            </label>
            {field.prefix ? (
              <div className="flex">
                <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l">
                  {field.prefix}
                </span>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || 'text'}
                  required={field.required}
                  value={value}
                  onChange={handleChange}
                  className="border rounded-r px-3 py-2 flex-1"
                />
              </div>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type || 'text'}
                required={field.required}
                value={value}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
            )}
          </div>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`cadastro_${tipo}`, JSON.stringify(formData));
    router.push('/cadastro/concluido');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize">Cadastro – {tipo.replace('-', ' ')}</h2>

      <div className="space-y-6">
        {fields.map(field => renderField(field))}
      </div>

      <button
        type="submit"
        className="w-full mt-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Salvar {tipo}
      </button>
    </form>
  );
};

export default CadastroTipoForm;
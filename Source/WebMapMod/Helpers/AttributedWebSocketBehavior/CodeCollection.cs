﻿using System;
using Map = System.Collections.Generic.Dictionary<string, ushort>;

namespace TechPizza.WebMapMod
{
    public abstract partial class AttributedWebSocketBehavior
    {
        public class CodeCollection
        {
            public Map ByName { get; }

            public CodeCollection(Type enumType)
            {
                if (enumType == null)
                    throw new ArgumentNullException(nameof(enumType));

                if (!CodeEnumDefinition.IsValidEnum(enumType))
                    throw new ArgumentException(InvalidEnumError, nameof(enumType));

                var enumValues = Enum.GetValues(enumType);
                ByName = new Map(enumValues.Length, StringComparer.OrdinalIgnoreCase);

                foreach(ushort enumValue in enumValues)
                {
                    string enumName = Enum.GetName(enumType, enumValue);
                    if (enumValue == ReservedCode)
                        throw new ArgumentException(
                            $"The value of enum ({enumName}) is reserved.", nameof(enumType));

                    if (ByName.ContainsKey(enumName))
                        throw new ArgumentException(
                            "There are enum names that only differ in casing.", nameof(enumType));

                    ByName.Add(enumName.ToLower(), enumValue);
                }
            }

            public bool TryGetCode(string name, out ushort code)
            {
                return ByName.TryGetValue(name, out code);
            }
        }
    }
}

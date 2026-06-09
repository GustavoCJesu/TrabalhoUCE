import {
  ScrollView, StyleSheet, Text, View,
  TouchableOpacity, ActivityIndicator, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProfile } from '@/src/presentation/hooks/useProfile';
import { useHome } from '@/src/presentation/hooks/useHome';
import { container } from '@/src/core/config/container';

const logout = async () => {
  await container.authRepository.logout();
  router.replace('/(auth)/Login');
};

const getInitials = (name: string) =>
  name.split(' ').slice(0, 2).map(n => n[0].toUpperCase()).join('');

type SettingItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

const SETTINGS: SettingItem[] = [
  { icon: 'notifications-outline', label: 'Lembretes',         onPress: () => {} },
  { icon: 'chatbubble-outline',    label: 'Notificações',       onPress: () => {} },
  { icon: 'shield-outline',        label: 'Privacidade e dados', onPress: () => {} },
];

type PersonRowProps = {
  role: string;
  name: string;
  email: string;
  photoUrl?: string | null;
  isLast?: boolean;
};

function PersonRow({ role, name, email, photoUrl, isLast }: PersonRowProps) {
  const initials = name !== 'Não informado' ? getInitials(name) : '?';
  return (
    <>
      <View style={styles.personRow}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={styles.personAvatar} />
        ) : (
          <View style={styles.personAvatarPlaceholder}>
            <Text style={styles.personAvatarText}>{initials}</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.personRole}>{role}</Text>
          <Text style={styles.personName}>{name}</Text>
          <Text style={styles.personEmail}>{email}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.divider} />}
    </>
  );
}

export default function ProfileScreen() {
  const { profile, loading, error } = useProfile();
  const { home } = useHome();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Erro ao carregar'}</Text>
        <TouchableOpacity style={styles.botao} onPress={() => router.replace('/(auth)/Login')}>
          <Text style={styles.txtBotao}>Ir para o login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { name, id, photoUrl } = profile.profile;
  const percent = home?.plan.percentCompleted ?? 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.pageContent}>

        {/* Header do perfil */}
        <View style={styles.profileHeader}>
          <Text style={styles.appName}>Unifae Care</Text>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.avatarImg} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{getInitials(name)}</Text>
            </View>
          )}
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileId}>ID: {id}</Text>
        </View>

        {/* Equipe */}
        <Text style={styles.sectionLabel}>Equipe responsável</Text>
        <View style={styles.card}>
          <PersonRow
            role="Fisioterapeuta"
            name="Não informado"
            email="—"
            isLast={false}
          />
          <PersonRow
            role="Coordenador responsável"
            name={profile.coordinator.name}
            email={profile.coordinator.email}
            photoUrl={photoUrl}
            isLast
          />
        </View>

        {/* Meta semanal */}
        <Text style={styles.sectionLabel}>Meta semanal</Text>
        <View style={styles.card}>
          <View style={styles.progressWrap}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Concluído esta semana</Text>
              <Text style={styles.progressValue}>
                {percent}
                <Text style={styles.progressUnit}>%</Text>
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
            </View>
            <Text style={styles.progressSub}>
              {home?.plan.totalExercises ?? 0} exercícios no plano
            </Text>
          </View>
        </View>

        {/* Configurações */}
        <Text style={styles.sectionLabel}>Configurações</Text>
        <View style={styles.card}>
          {SETTINGS.map((item, index) => (
            <View key={item.label}>
              <TouchableOpacity style={styles.settingRow} onPress={item.onPress} activeOpacity={0.7}>
                <View style={styles.settingIcon}>
                  <Ionicons name={item.icon} size={20} color="#9CA3AF" />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </TouchableOpacity>
              {index < SETTINGS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  centered: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#F9FAFB',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  pageContent: {
    paddingHorizontal: 20,
    paddingTop: 44,
  },

  profileHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  avatarImg: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#064E3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#10B981',
    fontSize: 30,
    fontWeight: '500',
  },
  profileName: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 12,
  },
  profileId: {
    color: '#10B981',
    fontSize: 12,
    marginTop: 4,
  },

  sectionLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 4,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#374151',
    marginHorizontal: 16,
  },

  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  personAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  personAvatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personAvatarText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  personRole: {
    color: '#6B7280',
    fontSize: 11,
    marginBottom: 2,
  },
  personName: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '500',
  },
  personEmail: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },

  progressWrap: {
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    color: '#6B7280',
    fontSize: 13,
  },
  progressValue: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '500',
  },
  progressUnit: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '400',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 20,
  },
  progressSub: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 8,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    flex: 1,
    color: '#F9FAFB',
    fontSize: 14,
  },

  logoutBtn: {
    marginTop: 8,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#7F1D1D',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },

  botao: {
    backgroundColor: '#10B981',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 12,
  },
  txtBotao: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
});